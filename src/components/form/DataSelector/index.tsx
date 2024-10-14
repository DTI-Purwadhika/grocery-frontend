import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState } from "react";

import { useAutoComplete } from "@/hooks/useAutoComplete";

const DataSelector = ({ ...fields }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState(fields.value);

  const { collectData, hasMore, isLoading, onLoadMore } = useAutoComplete({
    title: fields.source,
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
      className="w-full text-xs"
      defaultItems={collectData}
      isLoading={isLoading}
      isRequired={fields.required || true}
      label={fields.label}
      labelPlacement="outside"
      listboxProps={{
        emptyContent: `${fields.label} not found`,
      }}
      placeholder={`${fields.label}...`}
      radius="sm"
      scrollRef={scrollerRef}
      variant="bordered"
      onInputChange={(keyword) => {
        setCurrentKeyword(keyword);
      }}
      onOpenChange={setIsOpen}
      onSelectionChange={fields.onChange}
      {...fields}
    >
      {(item) => (
        <AutocompleteItem key={fields.source === "categories" ? item.name : item.id}>
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default DataSelector;
