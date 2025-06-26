import { prestationResultDataObjecter } from "@business/domains/common/prestationResultData";
import { type Prestation } from "@business/domains/entities/prestation";
import { File } from "@duplojs/core";
import { envs } from "@interfaces/envs";
import { match, P } from "ts-pattern";

export namespace PrestationService {
	export function prestationResultRawDataHandler(prestationId: Prestation.Id, data: (File | string)[]) {
		return Promise.all(
			data.map(
				(value) => match({ value })
					.with(
						{ value: P.string },
						({ value }) => prestationResultDataObjecter.unsafeCreate({
							type: "text",
							value,
						}),
					)
					.with(
						{ value: P.instanceOf(File) },
						async({ value: file }) => {
							const path = `/${prestationId.value}_${process.hrtime.bigint().toString()}${file.informations.extension}`;
							await file.deplace(
								`${envs.UPLOAD_DIR}${path}`,
							);

							return prestationResultDataObjecter.unsafeCreate({
								type: "file",
								value: path,
							});
						},
					)
					.exhaustive(),
			),
		);
	}
}
