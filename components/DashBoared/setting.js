
import { gql, useApolloClient, useMutation } from "@apollo/client";

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

export default function Upload() {
  const [uploadFile] = useMutation(uploadFileMutation);
  return (
    <form
      onSubmit={() => {
        console.log("Submitted");
      }}
      encType={"multipart/form-data"}
    >
      <input
        name={"document"}
        type={"file"}
        onChange={({ target: { files } }) => {
          const file = files[0];
         

          file && uploadFile({ variables: { file: file } });
        }}
      />
    </form>
  );
}
