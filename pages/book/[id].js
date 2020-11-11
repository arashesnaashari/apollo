import { useRouter } from "next/router";
import Book from "../../components/Books/Book";

export default function Id() {
  let { id } = useRouter().query;

  return <Book id={id} />;
}
