import { fileTypeMapper } from "@/libs/lebackoss/types";
import { getExtention } from "./getExtension";

export function isImage(fileName: string): boolean {
	const extension = getExtention(fileName);

	if (!extension) {
		return false;
	}

	return fileTypeMapper[extension] === "image";
}
