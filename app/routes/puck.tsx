import { Button, Modal, TextInput } from "@mantine/core";
import { DropZone, Puck, Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { useState } from "react";

// Create Puck component config
const config: any = {
  categories: {
    typography: {
      components: ["HeadingBlock"],
    },
    grid: {
      components: ["Row"],
    },
  },
  components: {
    TextInput: {
      fields: {
        name: { type: "text" },
        lalel: { type: "text" },
        description: { type: "text" },
        placeholder: { type: "text" },
      },
      render: ({ editMode, ...props }: any) => <TextInput {...props} />,
    },
    HeadingBlock: {
      fields: {
        children: { type: "text" },
      },
      defaultProps: { children: "Hello, world" },
      render: ({ children }: any) => {
        return <h1>{children}</h1>;
      },
    },
    Row: {
      render: () => {
        return (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <DropZone zone="left-column" />
            <DropZone zone="right-column" />
          </div>
        );
      },
    },
  },
};

export default function () {
  const [data, setData] = useState<any>({});
  const [edit, setEdit] = useState(false);

  return (
    <div>
      {data && <Render config={config} data={data} />}
      <Button onClick={() => setEdit(true)}>Edit</Button>
      <Modal
        opened={edit}
        onClose={() => setEdit(false)}
        size="90%"
        withCloseButton={false}
      >
        <div style={{ width: "90%", height: 700 }}>
          <Puck config={config} data={data} onPublish={(d) => setData(d)} />
        </div>
      </Modal>
    </div>
  );
}
