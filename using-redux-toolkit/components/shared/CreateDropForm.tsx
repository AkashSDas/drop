import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import toast from "react-hot-toast";
import { Send } from "react-iconly";
import { updateIsOpen } from "store/create-drop-form/slice";
import { createDropThunk } from "store/create-drop-form/thunk";

const CreateDropForm = () => {
  const isOpen = useAppSelector((state) => state.createDropForm.isOpen);
  const isLoading = useAppSelector((state) => state.createDropForm.loading);
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values) => {
    if (token) {
      const isCreated = await dispatch(
        createDropThunk({ token, data: { content: values.search } })
      );
      if (isCreated) dispatch(updateIsOpen(false));
    } else {
      toast.error("You are not logged in");
    }
  };

  return !isOpen ? null : (
    <div className="fixed h-screen w-screen bg-[#000] bg-opacity-90 z-10">
      <div className="bg-primary fixed top-0 left-0 w-full h-[93px] flex justify-center items-center">
        <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
          {({ values, handleChange, isSubmitting }) => (
            <Form className="w-full flex justify-center items-center space-x-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={isLoading ? `animate-spin` : ""}
              >
                <Send primaryColor="rgb(58 140 255)" />
              </button>
              <input
                type="text"
                className="bg-primary w-[45%] outline-none text-text1 font-semibold"
                placeholder="Drop your bomb!"
                name="search"
                value={values.search}
                onChange={handleChange}
                autoFocus
              />
              <button
                type="button"
                className="bg-secondary text-text1 text-[17px] font-semibold pt-2 py-[13px] px-[22px] rounded-lg hover:brightness-75 transition-all"
                onClick={() => dispatch(updateIsOpen(false))}
                disabled={isSubmitting}
              >
                Close
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div
        className="w-full h-full z-[9] cursor-pointer"
        onClick={() => dispatch(updateIsOpen(false))}
      ></div>
    </div>
  );
};

export default CreateDropForm;
