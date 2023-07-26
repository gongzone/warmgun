import {
	combineTransactionSteps,
	findChildrenInRange,
	getChangedRanges,
	getMarksBetween,
	getAttributes,
	Editor,
	type NodeWithPos
} from '@tiptap/core';
import type { MarkType } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { find, test } from 'linkifyjs';

type AutolinkOptions = {
	type: MarkType;
	validate?: (url: string) => boolean;
};

export function autolink(options: AutolinkOptions): Plugin {
	return new Plugin({
		key: new PluginKey('autolink'),
		appendTransaction: (transactions, oldState, newState) => {
			const docChanges =
				transactions.some((transaction) => transaction.docChanged) &&
				!oldState.doc.eq(newState.doc);
			const preventAutolink = transactions.some((transaction) =>
				transaction.getMeta('preventAutolink')
			);

			if (!docChanges || preventAutolink) {
				return;
			}

			const { tr } = newState;
			const transform = combineTransactionSteps(oldState.doc, [...transactions]);
			const { mapping } = transform;
			const changes = getChangedRanges(transform);

			changes.forEach(({ oldRange, newRange }) => {
				// at first we check if we have to remove links
				getMarksBetween(oldRange.from, oldRange.to, oldState.doc)
					.filter((item) => item.mark.type === options.type)
					.forEach((oldMark) => {
						const newFrom = mapping.map(oldMark.from);
						const newTo = mapping.map(oldMark.to);
						const newMarks = getMarksBetween(newFrom, newTo, newState.doc).filter(
							(item) => item.mark.type === options.type
						);

						if (!newMarks.length) {
							return;
						}

						const newMark = newMarks[0];
						const oldLinkText = oldState.doc.textBetween(oldMark.from, oldMark.to, undefined, ' ');
						const newLinkText = newState.doc.textBetween(newMark.from, newMark.to, undefined, ' ');
						const wasLink = test(oldLinkText);
						const isLink = test(newLinkText);

						// remove only the link, if it was a link before too
						// because we don’t want to remove links that were set manually
						if (wasLink && !isLink) {
							tr.removeMark(newMark.from, newMark.to, options.type);
						}
					});

				// now let’s see if we can add new links
				const nodesInChangedRanges = findChildrenInRange(
					newState.doc,
					newRange,
					(node) => node.isTextblock
				);

				let textBlock: NodeWithPos | undefined;
				let textBeforeWhitespace: string | undefined;

				if (nodesInChangedRanges.length > 1) {
					// Grab the first node within the changed ranges (ex. the first of two paragraphs when hitting enter)
					textBlock = nodesInChangedRanges[0];
					textBeforeWhitespace = newState.doc.textBetween(
						textBlock.pos,
						textBlock.pos + textBlock.node.nodeSize,
						undefined,
						' '
					);
				} else if (
					nodesInChangedRanges.length &&
					// We want to make sure to include the block seperator argument to treat hard breaks like spaces
					newState.doc.textBetween(newRange.from, newRange.to, ' ', ' ').endsWith(' ')
				) {
					textBlock = nodesInChangedRanges[0];
					textBeforeWhitespace = newState.doc.textBetween(
						textBlock.pos,
						newRange.to,
						undefined,
						' '
					);
				}

				if (textBlock && textBeforeWhitespace) {
					const wordsBeforeWhitespace = textBeforeWhitespace.split(' ').filter((s) => s !== '');

					if (wordsBeforeWhitespace.length <= 0) {
						return false;
					}

					const lastWordBeforeSpace = wordsBeforeWhitespace[wordsBeforeWhitespace.length - 1];
					const lastWordAndBlockOffset =
						textBlock.pos + textBeforeWhitespace.lastIndexOf(lastWordBeforeSpace);

					if (!lastWordBeforeSpace) {
						return false;
					}

					find(lastWordBeforeSpace)
						.filter((link) => link.isLink)
						.filter((link) => {
							if (options.validate) {
								return options.validate(link.value);
							}
							return true;
						})
						// calculate link position
						.map((link) => ({
							...link,
							from: lastWordAndBlockOffset + link.start + 1,
							to: lastWordAndBlockOffset + link.end + 1
						}))
						// add link mark
						.forEach((link) => {
							tr.addMark(
								link.from,
								link.to,
								options.type.create({
									href: link.href
								})
							);
						});
				}
			});

			if (!tr.steps.length) {
				return;
			}

			return tr;
		}
	});
}

type ClickHandlerOptions = {
	type: MarkType;
};

export function clickHandler(options: ClickHandlerOptions): Plugin {
	return new Plugin({
		key: new PluginKey('handleClickLink'),
		props: {
			handleClick: (view, pos, event) => {
				if (event.button !== 0) {
					return false;
				}

				const attrs = getAttributes(view.state, options.type.name);
				const link = (event.target as HTMLElement)?.closest('a');

				const href = link?.href ?? attrs.href;
				const target = link?.target ?? attrs.target;

				if (link && href) {
					window.open(href, target);

					return true;
				}

				return false;
			}
		}
	});
}

type PasteHandlerOptions = {
	editor: Editor;
	type: MarkType;
};

export function pasteHandler(options: PasteHandlerOptions): Plugin {
	return new Plugin({
		key: new PluginKey('handlePasteLink'),
		props: {
			handlePaste: (view, event, slice) => {
				const { state } = view;
				const { selection } = state;
				const { empty } = selection;

				if (empty) {
					return false;
				}

				let textContent = '';

				slice.content.forEach((node) => {
					textContent += node.textContent;
				});

				const link = find(textContent).find((item) => item.isLink && item.value === textContent);

				if (!textContent || !link) {
					return false;
				}

				options.editor.commands.setMark(options.type, {
					href: link.href
				});

				return true;
			}
		}
	});
}
