import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState } from "react";

import { useAutoComplete } from "@/hooks/data";

const CategorySelect = ({ ...fields }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState(fields.value);

  const { collectData, hasMore, isLoading, onLoadMore } = useAutoComplete({
    title: "categories",
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
      isRequired
      className="w-full"
      defaultItems={collectData}
      isLoading={isLoading}
      label="Category"
      labelPlacement="outside"
      listboxProps={{
        emptyContent: "Category not found",
      }}
      placeholder="Choose the suitable category..."
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
      {(category) => <AutocompleteItem key={category.name}>{category.name}</AutocompleteItem>}
    </Autocomplete>
  );
};

export default CategorySelect;
