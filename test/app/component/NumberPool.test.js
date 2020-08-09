import { fireEvent, render } from "@testing-library/vue";
import NumberPool from "../../../src/app/component/NumberPool";

describe("<number-pool>", () => {
    const renderComponent = (selected, minCount = 6) => render(NumberPool, {
        props: {
            lowest: 1,
            highest: 36,
            selected,
            minCount
        }
    });

    it("should render", () => {
        const { container } = render(NumberPool);
        expect(container.firstElementChild.tagName).toBe('DIV');
        expect(container.firstElementChild.classList.contains("number-pool")).toBe(true);
    });

    it("should render 36 balls", () => {
        const { container } = renderComponent([]);
        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));
        expect(balls).toHaveLength(36);
    });

    it("should update the ball count from 36 to 45", async () => {
        const { container, updateProps } = renderComponent([]);

        await updateProps({ highest: 45 });

        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));
        expect(balls).toHaveLength(45);
    });

    it("should update the \"selected\" prop", async () => {
        const selected = [];

        const { container } = renderComponent(selected);

        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));

        await fireEvent.click(balls[7]);
        await fireEvent.click(balls[11]);
        await fireEvent.click(balls[21]);

        expect(selected).toStrictEqual(["8", "12", "22"]);
    });

    it("should raise the \"reached-minimum-count\" event", async () => {
        const { container, emitted } = renderComponent([], 3);

        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));

        await fireEvent.click(balls[7]);
        await fireEvent.click(balls[11]);
        await fireEvent.click(balls[21]);

        expect(emitted()).toHaveProperty("reached-minimum-count");
    });

    it("should raise the \"below-minimum-count\" event", async () => {
        const { container, emitted } =  renderComponent([], 3);

        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));

        await fireEvent.click(balls[9]);
        await fireEvent.click(balls[19]);
        await fireEvent.click(balls[29]);
        await fireEvent.click(balls[29]);

        expect(emitted()).toHaveProperty("below-minimum-count");
    });
});
