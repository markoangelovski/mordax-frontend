import * as urls from "../../config";
import useKey from "../../lib/hooks/useKey";
import { UploadIcon } from "./FileUpload.icons";

const FileUpload = () => {
  const { oldKey } = useKey();

  return (
    <div className="mt-4">
      <span className="text-sm">Select a file containing page details.</span>
      <div className="my-6">
        <span className="font-semibold">Requirements</span>
        <ul className="mt-2 list-disc pl-8">
          <li>.xlsx format</li>
          <li>5 MB maximum</li>
        </ul>
        <a
          className="text-sky-700 hover:text-sky-900"
          href={urls.api + `/locales/template?key=${oldKey}`}
          download
        >
          Download example file
        </a>
      </div>
      <div className="max-w-md">
        <div>
          <label className="relative flex min-h-[7rem] w-full cursor-pointer rounded-xl border-2 border-dashed border-slate-500 py-4 hover:border-solid hover:border-sky-700 child-hover:text-sky-700">
            <input
              className="absolute top-0 left-0 h-full w-full rounded-xl p-4"
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              name="template"
              id="template"
            />
            <div className="absolute top-0 flex h-full w-full items-center rounded-xl bg-white">
              <div className="flex w-28 justify-center">
                <UploadIcon className="mx-1 h-14 w-14" />
              </div>
              <div>
                <div>
                  <strong>Drop your file here</strong>
                </div>
                <span className="mt-2 inline-block text-sm text-sky-700">
                  Select your file
                </span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
