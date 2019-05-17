import rp from "request-promise"
import cheerio from "cheerio"

rp({
    uri: "https://www.oddschecker.com/politics/british-politics/next-conservative-leader",
    json: false,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
    }
}).then(page => {
    // console.log(page);
    const $ = cheerio.load(page);

    const table = $(".eventTable");

    const names = $(".eventTable .eventTableHeader .bookie-area aside a").map(function(k, q) {
        return $(this).attr("title")
    }).get();

    const candidates = $(".eventTable tbody#t1 tr").map(function(i, r) {
        const $r = $(this)

        const odds = $r.find(".bc,.np").map(function(j, p) {
            const $p = $(this);

            return { company: names[j], o: $p.attr("data-o"), odig: $p.attr("data-odig") };
        }).get();
        // $r()
        return { name: $r.attr("data-bname"), odds: odds };
    }).get();

    console.log(candidates[0]);

}).catch(err => {
    console.log(err);
});