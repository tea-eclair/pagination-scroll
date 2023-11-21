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
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
    
        // Добавляем дополнительный отступ (например, 5 пикселей) для более надежной проверки
        return scrollHeight - scrollTop <= clientHeight + 15;
    }
    
    document.addEventListener("scroll", function() {
        if (isBottom()) {
            console.log("scroll bottom");
            loadData();
        }
    });
    
    // Загружаем первую порцию данных при загрузке страницы
    loadData();
});
