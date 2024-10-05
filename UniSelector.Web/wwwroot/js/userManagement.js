﻿var dataTable;
$(document).ready(function () {
    dataTable = $('#tblDataUser').DataTable({
        responsive: true,
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: -1 }
        ],
        "ajax": {
            url: "/Admin/UserManagement/GetAll",
            type: "GET",
            dataType: "json",
            error: function (xhr, error, thrown) {
                console.log('Error:', error);
            }
        },
        "columns": [
            { "data": "email", "width": "15%" },
            { "data": "name", "width": "15%" },
            { "data": "address", "width": "15%" },
            { "data": "grade", "width": "10%" },
            { "data": "nationality", "width": "10%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="btn-group" role="group">
                            <a href="/admin/usermanagement/upsert/${data}" class="btn btn-primary btn-sm">
                                <i class="bi bi-pencil-square"></i> Edit
                            </a>
                            <a onClick=Delete('/admin/usermanagement/delete/${data}') class="btn btn-danger btn-sm">
                                <i class="bi bi-trash-fill"></i> Delete
                            </a>
                        </div>`;
                },
                "width": "20%"
            },
        ]
    });
});

function Delete(url) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    if (data.success) {
                        dataTable.ajax.reload();
                        toastr.success(data.message);
                    } else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    });
}