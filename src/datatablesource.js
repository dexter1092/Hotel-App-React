import React from 'react';
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "User Name",
    width: 230,
  },
  {
    field: "picture",
    headerName: "Picture",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email_id",
    headerName: "Email",
    width: 230,
  },

  {
    field: "user_type_name",
    headerName: "User Type",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      if (params.row.status === 1) {
        return <div>Active</div>;
      }
      return <div>Inactive</div>;
    },
  }
];

