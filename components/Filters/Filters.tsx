import { ChangeEvent, ChangeEventHandler, useState } from "react";

const Toggle = ({
  field,
  checked,
  handler
}: {
  field: string;
  checked: boolean;
  handler: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <span className="flex" key={field}>
      <label htmlFor={field} className="mr-5 cursor-pointer">
        {field}
      </label>
      <div className="relative mr-5 flex items-center">
        <input
          onChange={handler}
          type="checkbox"
          name={field}
          id={field}
          checked={checked}
          className="peer h-5 w-10 cursor-pointer appearance-none rounded-full border border-red-600/50 checked:border-green-600/50"
        />
        <span className="pointer-events-none absolute  left-1 block h-3 w-3 rounded-full bg-red-600/50 peer-checked:left-6 peer-checked:bg-green-600/50"></span>
      </div>
    </span>
  );
};

const Filters = ({
  fields,
  setFilterFields,
  displayFields
}: {
  fields: string[];
  setFilterFields: Function;
  displayFields: string[];
}) => {
  const [hiddenFields, setHiddenFields] = useState<string[]>([]);

  return (
    <div className="mb-4 flex flex-wrap">
      <Toggle
        field="Disable/Enable all"
        checked={fields.length === displayFields.length}
        handler={(e: ChangeEvent<HTMLInputElement>) => {
          const checked = e.currentTarget.checked;

          if (checked) {
            setFilterFields(displayFields);
            setHiddenFields([]);
          }

          if (!checked) {
            setFilterFields([]);
            setHiddenFields(fields);
          }
        }}
      />
      {displayFields.map(field => (
        <Toggle
          key={field}
          field={field}
          checked={fields.indexOf(field) > -1}
          handler={(e: ChangeEvent<HTMLInputElement>) => {
            const checked = e.currentTarget.checked;

            if (checked) {
              setFilterFields([...fields, field]);
              setHiddenFields(
                hiddenFields.filter(hiddenField => hiddenField !== field)
              );
            }

            if (!checked) {
              setHiddenFields([...hiddenFields, field]);
              setFilterFields(
                fields.filter(filteredField => filteredField !== field)
              );
            }
          }}
        />
      ))}
    </div>
  );
};

export default Filters;
