export default {
    listTaskSearchSort: state => {
        const { strSearch } = state;
        let newItems = state.listTask.filter((item) => {
            return item.name.toLowerCase().includes(strSearch.toLowerCase());
        });

        var listTask = [...newItems];
        listTask.sort((a, b) => {
            let numOrder = state.orderDir === "asc" ? -1 : 1;
            //a b c d e f
            if (a[state.orderBy] < b[state.orderBy]) return numOrder;
            else if (a[state.orderBy] > b[state.orderBy]) return numOrder * -1;
            return 0;
        }, );
        return listTask;
    }
}