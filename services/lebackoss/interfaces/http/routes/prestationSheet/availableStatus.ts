
useBuilder()
	.createRoute("POST", "/available-prestationsheet-status")
	.handler(
		() => new OkHttpResponse("prestationSheet.updated"),
		makeResponseContract(OkHttpResponse, "prestationSheet.updated"),
	);
