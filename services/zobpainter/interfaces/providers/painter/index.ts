/* eslint-disable @typescript-eslint/no-magic-numbers */
import { envs } from "@interfaces/envs";
import { loadImage, createCanvas } from "canvas";
import { resolve } from "path";

interface InputDrawRandomCircle {
	inputPath: string;
	numberOfCircles?: number;
	minRadius?: number;
	maxRadius?: number;
}

export class PainterProvider {
	public static async drawRandomCircles(
		{ inputPath, numberOfCircles = 10, minRadius = 10, maxRadius = 40 }: InputDrawRandomCircle,
	) {
		const imageBuffer = await fetch(`${envs.LEBACKOSS_BASE_URL}/files-upload${inputPath}`)
			.then((response) => response.arrayBuffer())
			.then((arrayBuffer) => Buffer.from(arrayBuffer));

		const image = await loadImage(imageBuffer);

		const canvas = createCanvas(image.width, image.height);

		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0);

		ctx.fillStyle = this.getRandomColor();
		ctx.globalAlpha = 0.7;

		const circles = Array.from({ length: numberOfCircles }, () => ({
			posX: Math.random() * image.width,
			posY: Math.random() * image.height,
			radius: Math.random() * (maxRadius + minRadius),
		}));

		circles.forEach((circle) => {
			ctx.beginPath();
			ctx.arc(circle.posX, circle.posY, circle.radius, 0, 2 * Math.PI);
			ctx.fill();
		});

		const blob = new Blob([canvas.toBuffer("image/png")], { type: "image/png" });

		return new File([blob], "result.png", { type: "image/png" });
	}

	public static async drawZob(inputPath: string) {
		const imageBuffer = await fetch(`${envs.LEBACKOSS_BASE_URL}/files-upload${inputPath}`)
			.then((response) => response.arrayBuffer())
			.then((arrayBuffer) => Buffer.from(arrayBuffer));

		const baseImage = await loadImage(imageBuffer);

		const zobImage = await loadImage(resolve(import.meta.dirname, "images/zob.png"));

		const canvas = createCanvas(baseImage.width, baseImage.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(baseImage, 0, 0);

		const zobX = (baseImage.width - zobImage.width) / 2;
		const zobY = (baseImage.height - zobImage.height) / 2;

		ctx.drawImage(zobImage, zobX, zobY);

		const blob = new Blob([canvas.toBuffer("image/png")], { type: "image/png" });
		return new File([blob], "result.png", { type: "image/png" });
	}

	private static getRandomColor(): string {
		const hex = Math.floor(Math.random() * 16777215).toString(16);
		return `#${hex.padStart(6, "0")}`;
	}
}
