import { fireEvent, render } from "@testing-library/vue";
import NumberPool from "../../../src/app/component/NumberPool";

describe("<number-pool>", () => {
    it("should render", () => {
        const { container } = render(NumberPool);
        expect(container.firstElementChild.tagName).toBe('DIV');
        expect(container.firstElementChild.classList.contains("number-pool")).toBe(true);
    });

    it("should render 36 balls", () => {
        const { container } = render(NumberPool, { props: {lowest: 1, highest: 36 } });
        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));
        expect(balls).toHaveLength(36);
    });

    it("should update the ball count from 36 to 45", async () => {
        const { container, updateProps } = render(NumberPool, { props: {lowest: 1, highest: 36 } });

        await updateProps({ highest: 45 });

        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));
        expect(balls).toHaveLength(45);
    });

    it("should update the \"selected\" prop", () => {
        const selected = [];

        const { container } = render(NumberPool, { props: {lowest: 1, highest: 36, selected } });

        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));

        fireEvent.click(balls[7]);
        fireEvent.click(balls[11]);
        fireEvent.click(balls[21]);

        expect(selected).toStrictEqual(["8", "12", "22"]);
    });
});
