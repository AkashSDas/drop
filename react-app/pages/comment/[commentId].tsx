import DropComment from "@components/drop/DropComment";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Send } from "react-iconly";
import { updateLoading } from "store/comment/slice";
import { fetchCommentThunk, updateCommentThunk } from "store/comment/thunk";

const UpdateDropCommentPage = () => {
  const router = useRouter();
  const { loading, comment } = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) {
      const { commentId } = router.query;
      dispatch(fetchCommentThunk(commentId as string));
    } else {
      dispatch(updateLoading(true));
    }
  }, [router.isReady]);

  if (loading || !comment) return <main>Loading...</main>;
  return (
    <main>
      <DropComment comment={comment} hideActions />

      <Formik
        initialValues={{ content: comment.content }}
        onSubmit={async (values, { resetForm }) => {
          await dispatch(
            updateCommentThunk({
              commentId: comment.id,
              dropId: comment.dropId,
              content: values.content,
            })
          );
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className="w-full flex space-x-4 mb-3">
            <input
              type="text"
              className="outline-none bg-card rounded-lg w-full px-6 py-[14px] placeholder:text-text2 text-text1 placeholder:opacity-60"
              onChange={handleChange}
              name="content"
              placeholder="Updated comment"
              value={values.content}
            />
            <button
              className={isSubmitting ? `animate-spin` : ""}
              disabled={isSubmitting}
            >
              <Send primaryColor="#3A8CFF" />
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default UpdateDropCommentPage;
