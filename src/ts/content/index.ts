import Observer from "@Content/observer";
import { DocumentService } from "@Content/service/DocumentService";
import GCTabs from "@Content/components/GCTabs";

const observer = new Observer();

observer.addCallback("comments", {
    target: (dc: Document)=> dc.querySelector("ytd-comments"),
    callback: (mutation: MutationRecord[], target: HTMLElement)=> {
        DocumentService.createAndInsertReactComponentBefore("div", "gc-tabs", target, GCTabs)
    },
    interruptExpression: (dc: Document) => !!dc.getElementById("gc-tabs")
});

observer.observe(document.body, { childList: true, subtree: true });