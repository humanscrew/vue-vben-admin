export const license =
  'NTllY2E5ZTBmYWFmOTdhOWExMjBiYjQzYmMzMTk0NDRhNDk4ZTFiYTQwZGE3MzI4NjZlOGQwNDkzMTNlY2Y3ZDgxODUxOTkxYzQyY2ZlYTdlMjg0YzVjNWZiMDgwMzIzZmQ1YWViMTVjMzBiMzcwNzRkNGFlYjUwNjA1ZWRhMWEsZXlKdVlXMWxJam9pYUhWdFlXNXpZM0psZHlJc0ltUmhkR1VpT2pFMk16ZzBPRGsyTURBc0ltUnZiV0ZwYmlJNld5SWlMQ0pzYjJOaGJHaHZjM1FpWFN3aWNHeGhiaUk2TUN3aWMyTnZjR1VpT2xzaWRqY2lMQ0oyT0NKZGZRPT0=';

export const setting = {
  worksheets: [
    {
      // minDimensions: [5, 5],
      filters: true,
      // search: true,
      // pagination: 50,
      // paginationOptions: [20, 50, 100, 200],
      tableOverflow: true,
      // tableWidth: window.innerWidth,
      // tableHeight: window.innerHeight,
      csvFileName: '无标题' + new Date().valueOf(),
    },
  ],
  tabs: {
    allowCreate: true,
    hideHeaders: true,
    allowChangePosition: true,
  },
  toolbar: true,
  loadingSpin: true,
  parseTableAutoCellType: true,
  includeHeadersOnDownload: true,
  license:
    'MWEzMTE4MGFkNWY5YzQzNjE4NjZiNmE1NThhM2M0Yjc1NmUyNGM2N2YzZjU2NDQ5ZjM1MGFiYWNmOTFkNTkwODFiYmYwNDE1YjhhM2ViNGUyMzM2YjYzY2Q4NTcyMWE4MGQ4YjVjNjI2NWY4NWYyMTBjMWU5M2ZmNTU4OGI1MDQsZXlKdVlXMWxJam9pY0dGMWJDNW9iMlJsYkNJc0ltUmhkR1VpT2pFMk5UZzVOakk0TURBc0ltUnZiV0ZwYmlJNld5SnFjM0J5WldGa2MyaGxaWFF1WTI5dElpd2lZM05pTG1Gd2NDSXNJbXB6YUdWc2JDNXVaWFFpTENKc2IyTmhiR2h2YzNRaVhTd2ljR3hoYmlJNklqSWlMQ0p6WTI5d1pTSTZXeUoyTnlJc0luWTRJaXdpY0dGeWMyVnlJaXdpYzJobFpYUnpJaXdpWm05eWJYTWlMQ0p5Wlc1a1pYSWlMQ0ptYjNKdGRXeGhJbDE5',
  contextMenu: function (...arg: any) {
    arg[4].pop();
    return arg[4];
  },
};

export default setting;
