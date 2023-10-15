import { fetchDrafts } from "@/lib/services/draft/fetch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/@ui/accordion"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

import { DraftListItem } from "./draft-list-item"
import { DraftListItemMenu } from "./draft-list-item-menu"

type DraftAccoridonProps = {
  userId: string
}

export const DraftAccordion = async ({ userId }: DraftAccoridonProps) => {
  const drafts = await fetchDrafts(userId)

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="drafts"
      className="w-full"
    >
      <AccordionItem value="drafts">
        <AccordionTrigger>
          <TextWithIcon
            icon={(Icons) => <Icons.DocumentList className="h-4 w-4" />}
            text={(Text) => <Text>나의 초고</Text>}
            gap={2}
          />
        </AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col">
            {drafts.map((draft) => (
              <li className="flex items-center gap-4" key={draft.id}>
                <DraftListItem draft={draft} />
                <DraftListItemMenu draftId={draft.id} />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
