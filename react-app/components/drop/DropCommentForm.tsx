import { Form, Formik } from "formik";
import { useAppDispatch } from "lib/hooks/store";
import { Send } from "react-iconly";
import { createComment } from "store/drop-comments/thunk";

const DropCommentForm = ({ dropId }: { dropId: string }) => {
  const initialValues = { content: "" };
  const dispatch = useAppDispatch();

  const onSubmit = async (values: typeof initialValues, { resetForm }) => {
    const response = await dispatch(
      createComment({ content: values.content, dropId })
    );
    if ((response.payload as any)?.isCreated ?? null) resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, values, isSubmitting }) => (
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
  );
};

export default DropCommentForm;
