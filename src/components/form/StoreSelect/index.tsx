import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState } from "react";

import { useAutoComplete } from "@/hooks/useAutoComplete";
import { toCapital } from "@/services/formatter";

import { SelectorType } from "./type";

const StoreSelect = ({ source = "" }: SelectorType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const { collectData, hasMore, isLoading, onLoadMore } = useAutoComplete({
    title: source,
    keyword: currentKeyword,
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore,
  });

  return (
    <Autocomplete
      className="w-full"
      defaultItems={collectData}
      isLoading={isLoading}
      label={toCapital(source)}
      labelPlacement="outside"
      listboxProps={{
        emptyContent: "Data not found",
      }}
      placeholder={`Choose the suitable ${source}...`}
      radius="sm"
      scrollRef={scrollerRef}
      variant="bordered"
      onInputChange={(keyword) => {
        setCurrentKeyword(keyword);
      }}
      onOpenChange={setIsOpen}
    >
      {/* <AutocompleteItem key={"hehe"}>hehe</AutocompleteItem> */}
      {(content) => <AutocompleteItem key={content.id}>{content.name}</AutocompleteItem>}
    </Autocomplete>
  );
};

export default StoreSelect;
