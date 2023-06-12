import type { EditorConfig } from '@editorjs/editorjs';

export const editorInternationalization = {
	messages: {
		ui: {
			blockTunes: {
				toggler: {
					'Click to tune': '튜닝하기',
					'or drag to move': '드래그해서 이동하기'
				}
			},
			inlineToolbar: {
				converter: {
					'Convert to': '바꾸기'
				}
			},
			toolbar: {
				toolbox: {
					Add: '추가하기'
				}
			}
		},
		toolNames: {
			Text: '본문',
			Heading: '제목',
			List: '리스트',
			Quote: '인용',
			Image: '이미지',
			Bold: '굵게',
			Italic: '기울게',
			Link: '링크',
			InlineCode: '인라인 코드',
			Underline: '밑줄',
			Marker: '마커',
			Warning: 'Примечание',
			Checklist: 'Чеклист',
			Code: '코드',
			Delimiter: 'Разделитель',
			'Raw HTML': 'HTML-фрагмент',
			Table: 'Таблица'
		},
		tools: {
			link: {
				'Add a link': '링크를 추가하세요'
			}
		},
		blockTunes: {
			delete: {
				Delete: '삭제하기'
			},
			moveUp: {
				'Move up': '위로 이동하기'
			},
			moveDown: {
				'Move down': '아래로 이동하기'
			},
			header: {
				'Heading 1': '제목 1',
				'Heading 2': '제목 2',
				'Heading 3': '제목 3'
			}
		}
	}
} satisfies EditorConfig['i18n'];
