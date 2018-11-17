export const columns = [
  {
    title: "序号",
    type: "index",
    width: 60,
    align: "center"
  },
  {
    title: "名称",
    key: "name",
    align: "center"
  },
  {
    title: "状态",
    key: "statusName",
    align: "center"
  },
]

export const getColumns = ctx =>
  columns.map(c => {
    if (c.render) {
      c.render = c.render.bind(ctx);
    }
    return c;
  });
