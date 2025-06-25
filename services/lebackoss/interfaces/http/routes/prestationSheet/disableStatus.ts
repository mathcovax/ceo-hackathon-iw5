
useBuilder()
	.createRoute("POST", "/disable-prestationsheet-status")
	.handler(
		() => new OkHttpResponse("prestationSheet.updated"),
		makeResponseContract(OkHttpResponse, "prestationSheet.updated"),
	);
