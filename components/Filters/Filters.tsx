import { useEffect, useRef, useState } from "react";

const Filters = ({
  fields,
  setFilterFields
}: {
  fields: string[];
  setFilterFields: Function;
}) => {
  //   const [fieldsToDisplay, setFieldsToDisplay] = useState<string[]>(fields);
  const fieldsToDisplay = useRef(fields);
  const [hiddenFields, setHiddenFields] = useState<string[]>([]);

  //   useEffect(() => {
  //     setFieldsToDisplay(fields);
  //   }, [fields]);
  console.log("fieldsToDisplay", fieldsToDisplay);
  return (
    <div className="">
      filters
      {fieldsToDisplay.current.map(field => (
        <div
          key={field}
          onClick={() => {
            setHiddenFields([...hiddenFields, field]);
            setFilterFields(
              fields.filter(filteredField => filteredField !== field)
            );
          }}
        >
          {field}
        </div>

        // <div key={field} className="flex justify-center">
        //   <div className="form-check form-switch">
        //     <input
        //       className="form-check-input float-left -ml-10 h-5 w-9 cursor-pointer appearance-none rounded-full bg-white bg-gray-300 bg-contain bg-no-repeat align-top shadow-sm focus:outline-none"
        //       type="checkbox"
        //       role="switch"
        //       id={field}
        //     />
        //     <label
        //       className="form-check-label inline-block text-gray-800"
        //       htmlFor={field}
        //     >
        //       {field}
        //     </label>
        //   </div>
        // </div>
      ))}
    </div>
  );
};

export default Filters;
