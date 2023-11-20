document.addEventListener("DOMContentLoaded", function() {
    const dataTableBody = document.querySelector("#data-table tbody");
    let page = 1;
    const itemsPerPage = 10;

    function loadData() {
        $.ajax({
            url: `/load_data/${page}`,
            method: "GET",
            success: function(response) {
                // Добавляем данные в таблицу
                response.data.forEach(function(item) {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${item.serial}</td><td>${item.description}</td>`;
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
        const scrollHeight = dataTableBody.scrollHeight;
        const scrollTop = dataTableBody.scrollTop;
        const clientHeight = dataTableBody.clientHeight;

        return scrollHeight - scrollTop <= clientHeight;
    }

    dataTableBody.addEventListener("scroll", function() {
        if (isBottom()) {
            loadData();
        }
    });

    // Загружаем первую порцию данных при загрузке страницы
    loadData();
});
