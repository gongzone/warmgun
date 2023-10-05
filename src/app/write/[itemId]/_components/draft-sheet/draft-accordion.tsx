import { fetchDrafts } from "@/lib/services/draft/fetch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/@ui/accordion"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"
import { TextWithIcon } from "@/components/@ui/text-with-icon"

import { DraftListItem } from "./draft-list-item"

type DraftAccoridonProps = {
  userId: string
}

export const DraftAccordion = async ({ userId }: DraftAccoridonProps) => {
  const drafts = await fetchDrafts(userId)

  return (
    <Accordion type="single" collapsible defaultValue="base" className="w-full">
      <AccordionItem value="base">
        <AccordionTrigger>
          <TextWithIcon
            icon={<Icons.DocumentList className="h-4 w-4" />}
            text={<Text>나의 초고</Text>}
            gap={2}
          />
        </AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col">
            {drafts.map((draft) => (
              <li key={draft.id}>
                <DraftListItem draft={draft} />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
