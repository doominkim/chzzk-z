import { ChzzkConnector } from "../lib";

describe("Chzzk-Z TEST SCENARIO => (e2e)", () => {
  const chzzk = new ChzzkConnector();

  afterAll((done) => {
    done();
  });

  describe("APIs TEST", () => {
    it("find channles => ", async () => {
      const channels = await chzzk.channel.findByKeyword("녹두로");
      expect(channels["data"]?.length > 0).toBe(true);
    });
  });
});
