import DropsListView from "@components/drop/DropsListView";
import { useAppSelector } from "lib/hooks/store";

const IndexPage = () => {
  const isOpen = useAppSelector((state) => state.createDropForm.isOpen);

  return (
    <main className={isOpen ? `fixed` : ""}>
      <h3>💧 Drops</h3>
      <DropsListView />
    </main>
  );
};

export default IndexPage;
