import { Form, Formik } from "formik";
import { Search } from "react-iconly";

const CreateDropForm = () => {
  return (
    <div className="fixed h-screen w-screen bg-[#000] bg-opacity-90 z-10">
      <div className="bg-primary fixed top-0 left-0 w-full h-[93px] flex justify-center items-center">
        <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
          {({ values, handleChange }) => (
            <Form className="w-full flex justify-center items-center space-x-8">
              <button type="submit">
                <Search />
              </button>
              <input
                type="text"
                className="bg-primary w-[45%] outline-none"
                placeholder="Search Everything"
                name="search"
                value={values.search}
                onChange={handleChange}
              />
              <button
                type="button"
                className="bg-secondary text-text1 text-[17px] font-semibold pt-2 py-[13px] px-[22px] rounded-lg hover:brightness-75 transition-all"
              >
                Close
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateDropForm;
