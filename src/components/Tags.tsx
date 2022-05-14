import TagItem from './TagItem';

interface TagsProps {
  tags: string[];
  removeTag?: (tag: string) => void;
}

export default function Tags({ tags, removeTag }: TagsProps) {
  return (
    <div className="mb-[30px] sm:mb-8 flex flex-wrap w-full justify-start sm:w-[432px]">
      {tags.map((tag) => (
        <TagItem key={tag} tag={tag} removeTag={removeTag || null} />
      ))}
    </div>
  );
}
