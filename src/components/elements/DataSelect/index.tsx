"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useEffect, useState } from "react";

import { useAutoComplete } from "@/hooks/useAutoComplete";
import { toCapital } from "@/services/formatter";
import { useParam } from "@/hooks/useParam";
import { useProfile } from "@/hooks/useProfile";

import { SelectorType } from "./type";

const StoreSelect = ({ source = "", noLabel = false }: SelectorType) => {
  const { getQueryParam, setQueryParam } = useParam();
  const [isOpen, setIsOpen] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState(getQueryParam(source) || "");
  const { userProfile } = useProfile();
  const { collectData, hasMore, isLoading, onLoadMore } = useAutoComplete({
    title: source,
    keyword: currentKeyword,
  });

  useEffect(() => {
    if (userProfile && source === "stores") setQueryParam(source, userProfile?.role || "");
  }, [userProfile]);

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore,
  });

  return (
    <Autocomplete
      aria-labelledby={source}
      className="w-full"
      defaultItems={collectData}
      isDisabled={userProfile?.role?.toLowerCase() !== "super" && source === "stores"}
      isLoading={isLoading}
      label={noLabel ? "" : toCapital(source)}
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
      onSelectionChange={(selected) => {
        setQueryParam(source, selected?.toString() || "");
      }}
    >
      {(content) => <AutocompleteItem key={content.id}>{content.name}</AutocompleteItem>}
    </Autocomplete>
  );
};

export default StoreSelect;
