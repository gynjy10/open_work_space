# split_principles.py
# 원본 보존: input 파일은 읽기만 하고, 결과는 별도 파일로 생성합니다.

import json
from collections import OrderedDict
from pathlib import Path

INPUT = Path("개념정리.json")
OUTPUT = Path("개념정리_principles_split.json")

def load_json(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f, object_pairs_hook=OrderedDict)

def save_json(obj, path: Path):
    with path.open("w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)

def split_principles_in_place(unit_obj):
    """
    요구사항:
    - principles[*].text_D 내부의 각 '키' -> 새 데이터셋의 section
    - 해당 '값'(value) -> 새 데이터셋의 text_D
    - code는 원본 code 유지
    - html_D, tts_D는 비어있는 객체 {} 로 둠
    - 원본 내용(텍스트/기호/개행 등)은 그대로 보존
    """
    contents = unit_obj.get("contents", [])
    for cat in contents:
        principles = cat.get("principles", [])
        new_list = []

        for entry in principles:
            code = entry.get("code", "")
            # entry.section 은 현재 단일 값이지만, 분리 후에는 text_D의 key가 section이 됨
            text_D = entry.get("text_D", OrderedDict())

            # dict 가 아닌 경우는 이미 분리되어 있다고 보고 그대로 둠
            if not isinstance(text_D, dict):
                new_list.append(entry)
                continue

            # 각 key/value를 개별 데이터셋으로 생성
            for k, v in text_D.items():
                new_entry = OrderedDict()
                new_entry["code"] = code
                new_entry["section"] = k                      # key -> section
                new_entry["text_D"] = v                      # value -> text_D (원문 그대로)
                new_entry["html_D"] = {}                     # 비움 (요구사항)
                new_entry["tts_D"] = {}                      # 비움 (요구사항)
                new_list.append(new_entry)

        cat["principles"] = new_list

def main():
    data = load_json(INPUT)

    # 최상위가 단일 객체 또는 리스트(여러 unit) 모두 처리
    if isinstance(data, list):
        for unit in data:
            split_principles_in_place(unit)
    else:
        split_principles_in_place(data)

    save_json(data, OUTPUT)
    print(f"완료: {OUTPUT.as_posix()} 에 저장했습니다.")

if __name__ == "__main__":
    main()
