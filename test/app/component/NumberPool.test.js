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
        expect(container.firstElementChild.tagName).toBe("DIV");
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

    it("should raise the \"updated-selected\" event", async () => {
        const { container, emitted } = renderComponent([]);

        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));

        await fireEvent.click(balls[7]);
        await fireEvent.click(balls[11]);
        await fireEvent.click(balls[21]);

        expect(emitted()).toHaveProperty("updated-selected");

        // Expect event to be emitted 3 times
        expect(emitted()["updated-selected"]).toHaveLength(3);

        // Event value is wrapped in an array
        // See: https://vue-test-utils.vuejs.org/api/wrapper/#emitted
        expect(emitted()["updated-selected"][2]).toEqual([[8, 12, 22]]);
    });

    it("should add to existing state of selected numbers", async () => {
        const { container, emitted } = renderComponent([25, 31]);
        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));

        await fireEvent.click(balls[7]);
        await fireEvent.click(balls[11]);
        await fireEvent.click(balls[21]);

        const emittedEvents = emitted()["updated-selected"];
        expect(emittedEvents).toHaveLength(3);

        const lastEventData = emittedEvents[2].flat();
        expect(lastEventData).toHaveLength(5);
        expect(lastEventData[2]).toBe(8);
        expect(lastEventData[1]).toBe(31);
        expect(lastEventData[4]).toBe(22);
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
        const { container, emitted } = renderComponent([], 3);

        const balls = Array.from(container.querySelectorAll(".number-pool__ball"));

        await fireEvent.click(balls[9]);
        await fireEvent.click(balls[19]);
        await fireEvent.click(balls[29]);
        await fireEvent.click(balls[29]);

        expect(emitted()).toHaveProperty("below-minimum-count");
    });
});
