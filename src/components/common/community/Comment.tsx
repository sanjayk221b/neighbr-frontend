import { IResident } from "@/types";

interface CommentProps {
  author: { id: IResident };
  content: string;
}

const Comment: React.FC<CommentProps> = ({ author, content }) => {
  return (
    <div className="flex items-start mb-4">
      <img
        src={author.id.image}
        alt={author.id.name}
        className="w-8 h-8 rounded-full mr-2"
      />
      <div className="bg-gray-100 rounded-lg p-2 flex-grow">
        <h4 className="font-semibold text-xs">{author.id.name}</h4>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
