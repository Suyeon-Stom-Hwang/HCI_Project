import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export function InfoPopup() {
    return (
      <>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Lexile measures 란?</AccordionTrigger>
            <AccordionContent>
              널리 사용되고 있는 이독성지수 중 하나로 읽기 능력과 읽기 난이도를 나타내는 지수로 나눠져 있습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    )
  }