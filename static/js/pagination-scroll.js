document.addEventListener("DOMContentLoaded", function() {
    const dataTableBody = document.querySelector("#data-table tbody");
    let page = 1;

    function loadData() {
        $.ajax({
            url: `/load_data/${page}`,
            method: "GET",
            success: function(response) {
                // Добавляем данные в таблицу
                response.data.forEach(function(item) {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${item.id}</td><td>${item.name}</td>`;
                    dataTableBody.appendChild(row);
                });

                page++;
            },
            error: function(error) {
                console.error("Error loading data:", error);
            }
        });
    }

    function isBottom() {
        return dataTableBody.scrollHeight - dataTableBody.scrollTop === dataTableBody.clientHeight;
    }

    dataTableBody.addEventListener("scroll", function() {
        if (isBottom()) {
            loadData();
        }
    });

    // Загружаем первую порцию данных при загрузке страницы
    loadData();
});
