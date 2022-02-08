import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Send } from "react-iconly";
import { fetchComment, updateComment } from "store/comment/thunk";

import DropComment from "@components/drop/DropComment";

const UpdateDropCommentPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, comment } = useAppSelector((state) => state.comment);

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchComment(router.query.commentId as string));
    }
  }, [router.isReady]);

  const initialValues = { content: comment.content };
  const onSubmit = async (values: typeof initialValues) => {
    await dispatch(
      updateComment({
        commentId: comment.id,
        dropId: comment.dropId,
        content: values.content,
      })
    );
  };

  if (isLoading || !comment) return <main>Loading...</main>;

  return (
    <main>
      <DropComment comment={comment} hideActions />

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange, isSubmitting }) => {
          const style =
            "outline-none bg-card rounded-lg w-full px-6 py-[14px] placeholder:text-text2 text-text1 placeholder:opacity-60";
          const btnStyle = isSubmitting ? `animate-spin` : "";

          return (
            <Form className="w-full flex space-x-4 mb-3">
              <input
                type="text"
                className={style}
                onChange={handleChange}
                name="content"
                placeholder="Updated comment"
                value={values.content}
              />
              <button className={btnStyle} disabled={isSubmitting}>
                <Send primaryColor="#3A8CFF" />
              </button>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
};

export default UpdateDropCommentPage;
