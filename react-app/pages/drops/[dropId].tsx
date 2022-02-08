import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Send } from "react-iconly";
import { createCommentThunk } from "store/create-comment-form/thunk";
import { updateLoading as updateCommentsLoading } from "store/drop-comments/slice";
import { fetchDropCommentsThunk } from "store/drop-comments/thunk";
import { fetchDrop } from "store/drop/thunk";

import DropCardLoadng from "@components/drop/DropCardLoading";
import DropComments from "@components/drop/DropComments";
import DropCommentsLoading from "@components/drop/DropCommentsLoading";
import IndependentDropCard from "@components/drop/IndependentDropCard";

const DropSection = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, drop } = useAppSelector((state) => state.drop);

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchDrop(router.query?.dropId as string));
    }
  }, [router.query]);

  if (isLoading || !drop) return <DropCardLoadng />;
  return <IndependentDropCard drop={drop} />;
};

const DropPage = () => {
  const router = useRouter();
  const { drop } = useAppSelector((state) => state.drop);
  const { loading: commentsLoading, comments } = useAppSelector(
    (state) => state.dropComments
  );
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) {
      // const { dropId } = router.query;
      // dispatch(fetchDrop(dropId as string));
      // dispatch(
      //   fetchDropCommentsThunk({ dropId: dropId as string, init: true })
      // );
    } else {
      // dispatch(updateCommentsLoading(true));
    }
  }, [router.isReady]);

  return (
    <main>
      <DropSection />
      {/* 
      <section className="space-y-6">
        <h4>Comments</h4>
        <div className="border-b-[1px] border-solid border-[#32333B]"></div>

        <Formik
          initialValues={{ content: "" }}
          onSubmit={async (value, { resetForm }) => {
            if (token) {
              await dispatch(
                createCommentThunk({
                  token,
                  dropId: drop.id,
                  content: value.content,
                })
              );
              resetForm();
            } else {
              toast.error("You are not logged in");
            }
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form className="w-full flex space-x-4 mb-3">
              <input
                type="text"
                className="outline-none bg-card rounded-lg w-full px-6 py-[14px] placeholder:text-text2 text-text1 placeholder:opacity-60"
                onChange={handleChange}
                name="content"
                placeholder="Comment"
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

        {commentsLoading || !comments ? (
          <DropCommentsLoading />
        ) : (
          <DropComments />
        )}
      </section> */}
    </main>
  );
};

export default DropPage;
