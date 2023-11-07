import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@movieTone/ui';

const Sidebar = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-1/6 pt-[80px] sticky pr-8"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Movies</AccordionTrigger>
        <AccordionContent >Recommended</AccordionContent>
        <AccordionContent>Popular</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>TV Shows</AccordionTrigger>
        <AccordionContent>Recommended</AccordionContent>
        <AccordionContent>Popular</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Sidebar;
