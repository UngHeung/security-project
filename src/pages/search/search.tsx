import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search01Icon } from "hugeicons-react";

// 임시값
const searchCount = 0;
const name = "홍길동";
const position = "파트장";
const title = "가이드 제목입니다. 제목이 길면 줄바꿈 처리됩니다.";
const content = `가이드 내용이 표시됩니다. 내용이 2줄을 넘어가는 경우 줄임(...) 처리
됩니다. 가이드 내용이 표시됩니다. 내용이 2줄을 넘어가는 경우 줄임(...)
처리 됩니다.`;
const listItem = (
  <li className="hover:bg-muted mb-2 cursor-default rounded-md border-b p-2 text-sm">
    <div className="gap-2">
      {/* header */}
      <header className="flex flex-col items-end gap-2">
        <h3 className="w-full font-bold">{title}</h3>
        <div className="flex items-center gap-1 pb-2 text-xs">
          <span>{position}</span>
          <span className="font-medium">{name}</span>
          <span className="bg-accent h-5 w-5 rounded-full"></span>
        </div>
      </header>

      <p className="line-clamp-2 pt-2 text-sm">{content}</p>

      <div className="text-right">
        <Button
          className="mt-1 cursor-pointer font-light text-black"
          variant={"link"}
        >
          {">> 자세히보기"}
        </Button>
      </div>
    </div>
  </li>
);

export default function SearchPage() {
  return (
    <div>
      <h3 className="border-muted mb-4 border-b py-2 font-bold">검색</h3>
      <Accordion defaultValue={["item-1"]} className="border-0">
        {/* search with keyword */}
        <AccordionItem value={"item-1"}>
          <AccordionTrigger className="cursor-pointer">
            검색어로 찾기
          </AccordionTrigger>
          <AccordionContent>
            <InputGroup className="mb-2">
              <InputGroupInput placeholder="검색어를 입력하세요" />
              <InputGroupAddon>
                <Search01Icon />
              </InputGroupAddon>
              <InputGroupAddon align={"inline-end"}>
                {`${searchCount}개의 검색결과`}
              </InputGroupAddon>
            </InputGroup>
          </AccordionContent>
        </AccordionItem>

        {/* search with tags */}
        <AccordionItem value={"item-2"}>
          <AccordionTrigger className="cursor-pointer">
            태그로 찾기
          </AccordionTrigger>
          <AccordionContent>
            <SelectGroup className="mb-2 flex justify-between gap-2">
              {/* first tag */}
              <div className="flex w-full flex-col justify-start">
                <Select defaultValue={"미선택"}>
                  <SelectLabel>반출/환입</SelectLabel>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="반출/환입" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"미선택"}>미선택</SelectItem>
                    <SelectItem value={"반출"}>반출</SelectItem>
                    <SelectItem value={"환입"}>환입</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* second tag */}
              <div className="flex w-full flex-col justify-start">
                <Select defaultValue={"미선택"}>
                  <SelectLabel>카테고리</SelectLabel>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="반출/환입" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"미선택"}>미선택</SelectItem>
                    <SelectItem value={"정보자산"}>정보자산</SelectItem>
                    <SelectItem value={"미등록정보자산"}>
                      미등록정보자산
                    </SelectItem>
                    <SelectItem value={"고정일반자산"}>고정일반</SelectItem>
                    <SelectItem value={"고정일반자산(수시)"}>
                      고정일반자산(수시)
                    </SelectItem>
                    <SelectItem value={"문서"}>문서</SelectItem>
                    <SelectItem value={"오반입물품"}>오반입물품</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* third tag */}
              <div className="flex w-full flex-col justify-start">
                <Select defaultValue={"미선택"}>
                  <SelectLabel>자산종류</SelectLabel>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="반출/환입" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"미선택"}>미선택</SelectItem>
                    <SelectItem value={"노트북"}>노트북</SelectItem>
                    <SelectItem value={"휴대폰"}>휴대폰</SelectItem>
                    <SelectItem value={"랩탑"}>랩탑</SelectItem>
                    <SelectItem value={"저장소"}>저장소</SelectItem>
                    <SelectItem value={"보드"}>보드</SelectItem>
                    <SelectItem value={"녹음/녹화장치"}>
                      녹음/녹화장치
                    </SelectItem>
                    <SelectItem value={"포터블모니터"}>포터블모니터</SelectItem>
                    <SelectItem value={"기타"}>기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </SelectGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* list */}
      <div className="border-t px-2 pt-4">
        <ul>
          {listItem}
          {listItem}
          {listItem}
        </ul>
      </div>
    </div>
  );
}
