useBuilder()
	.createRoute("GET", "/test")
	.handler(
		() => new OkHttpResponse("test", { result: "zob" }),
	);
