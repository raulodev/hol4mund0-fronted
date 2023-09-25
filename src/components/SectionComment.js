import { useState, useEffect } from "react";
import { Comment } from "./Comment";
import { TextArea } from "./TextareaAutosize";
import { AuthRequired } from "@/components/Alert";
import { Button } from "./Button";
import useAxios from "@/hooks/useAxios";

export function SectionComment({ comments, article, onMutate, current_user_id, accessToken }) {
  const [content, setContent] = useState("");
  const [amountComments, setAmountComments] = useState(0);
  const [listComments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const { post, loading, error } = useAxios();

  useEffect(() => {
    let count = 0

    function addNewValueToComments(comments, newValue) {
      const newListComments = comments?.map((comment) => {
        const commentWithValue = { ...comment };
        if (comment.author_id == newValue) {
          commentWithValue.is_owner = true;
        } else {
          commentWithValue.is_owner = false;
        }
        count++
        if (comment.replies && comment.replies.length > 0) {
          commentWithValue.replies = addNewValueToComments(
            comment.replies,
            newValue
          );
        }
        return commentWithValue;
      });
      return newListComments;
    }
    const commentWithNewValue = addNewValueToComments(
      comments,
      current_user_id
    );
    setComments(commentWithNewValue)
    setAmountComments(count)

  }, [comments]);

  const submitComment = async () => {

    if (!accessToken) {
      setShowModal(true)
      return
    }

    if (content.length > 0) {

      const formData = new FormData();
      formData.append("content", content);
      formData.append("article", article);

      await post("/comments/", formData, accessToken);
      if (error?.response.status == 401) {
        return
      }

    }

    setContent("");
    onMutate();
  };

  function handlerOnFocus() {
    if (!accessToken) {
      setShowModal(true)
    }
  }

  return (
    <section className="py-8 lg:py-16">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            Comentarios ({amountComments})
          </h2>
        </div>
        <form className="mb-6 " onSubmit={(e) => e.preventDefault()}>
          <TextArea
            className="textarea textarea-bordered w-full text-base overflow-y-hidden min-h-16"
            placeholder="Escribe un comentario..."
            required={true}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={handlerOnFocus}
          />
          <Button type="submit" className="btn btn-neutral btn-sm" text="Publicar comentario" isLoading={loading} onClick={submitComment} />
        </form>

        {listComments?.map(
          (comment) =>
            !comment.parent_comment && (
              <Comment
                key={comment.id}
                id={comment.id}
                author={comment.author}
                author_first_name={comment.author_first_name}
                preview_image_author={comment.preview_image_author}
                author_description={comment.author_description}
                created_at={comment.created_at}
                article={article}
                content={comment.content}
                replies={comment.replies}
                is_owner={comment.is_owner}
                onMutate={onMutate}
                accessToken={accessToken}
              />
            )
        )}
      </div>
      <AuthRequired showModal={showModal} onShowModal={setShowModal} />
    </section>
  );
}
