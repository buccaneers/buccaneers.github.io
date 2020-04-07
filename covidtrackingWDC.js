(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [
		{id: "date",dataType: tableau.dataTypeEnum.string},
		{id: "state",dataType: tableau.dataTypeEnum.string},
		{id: "positive",dataType: tableau.dataTypeEnum.float},
		{id: "negative",dataType: tableau.dataTypeEnum.float},
		{id: "pending",dataType: tableau.dataTypeEnum.float},
		{id: "hospitalizedCurrently",dataType: tableau.dataTypeEnum.float},
		{id: "inIcuCurrently",dataType: tableau.dataTypeEnum.float},
		{id: "inIcuCumulative",dataType: tableau.dataTypeEnum.float},
		{id: "onVentilatorCurrently",dataType: tableau.dataTypeEnum.float},
		{id: "onVentilatorCumulative",dataType: tableau.dataTypeEnum.float},
		{id: "recovered",dataType: tableau.dataTypeEnum.float},
		{id: "hash",dataType: tableau.dataTypeEnum.string},
		{id: "dateChecked",dataType: tableau.dataTypeEnum.datetime},
		{id: "death",dataType: tableau.dataTypeEnum.float},
		{id: "hospitalized",dataType: tableau.dataTypeEnum.float},
		{id: "total",dataType: tableau.dataTypeEnum.float},
		{id: "totalTestResults",dataType: tableau.dataTypeEnum.float},
		{id: "posNeg",dataType: tableau.dataTypeEnum.float},
		{id: "fips",dataType: tableau.dataTypeEnum.float},
		{id: "deathIncrease",dataType: tableau.dataTypeEnum.float},
		{id: "hospitalizedIncrease",dataType: tableau.dataTypeEnum.float},
		{id: "negativeIncrease",dataType: tableau.dataTypeEnum.float},
		{id: "positiveIncrease",dataType: tableau.dataTypeEnum.float},
		{id: "totalTestResultsIncrease",dataType: tableau.dataTypeEnum.float}
	];

    var tableSchema = {
        id: "covidtracking",
        alias: "covidtracking.com",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

    myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://covidtracking.com/api/v1/states/daily.json", function(resp) {
        //var feat = resp.features,
            tableData = [];
			 //tableau.log("response:"+resp);

        // Iterate over the JSON object
        $.each(resp, function(i, field){
        tableData.push({
                "date": field.date,
                "state": field.state,
                "positive": field.positive,
				"negative": field.negative,
				"pending": field.pending,
				"hospitalizedCurrently": field.hospitalizedCurrently,
				"inIcuCurrently": field.inIcuCurrently,
				"inIcuCumulative": field.inIcuCumulative,
				"onVentilatorCurrently": field.onVentilatorCurrently,
				"onVentilatorCumulative": field.onVentilatorCumulative,
				"recovered": field.recovered,
				"hash": field.hash,
				"dateChecked": field.dateChecked,
				"death": field.death,
				"hospitalized": field.hospitalized,
				"total": field.total,
				"totalTestResults": field.totalTestResults,
				"posNeg": field.posNeg,
				"fips": field.fips,
				"deathIncrease": field.deathIncrease,
				"hospitalizedIncrease": field.hospitalizedIncrease,
				"negativeIncrease": field.negativeIncrease,
				"positiveIncrease": field.positiveIncrease,
				"totalTestResultsIncrease": field.totalTestResultsIncrease
            });
    });
        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Covidtracking.com Daily State Feed";
        tableau.submit();
    });
});
})();
