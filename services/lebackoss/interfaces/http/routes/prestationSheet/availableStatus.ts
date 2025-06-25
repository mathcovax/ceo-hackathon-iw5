
useBuilder()
	.createRoute("POST", "/available-prestationsheet-status")
	.handler(
		() => new OkHttpResponse("prestationSheet-status.updated"),
		makeResponseContract(OkHttpResponse, "prestationSheet-status.updated"),
	);
