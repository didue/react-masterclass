import 'styled-components';

// d.ts -> declaration file 이라는 뜻
// styled components의 테마 정의를 확장 정의
//
// How to?
//1. style.d.ts 에서 스타일 정의
//2. 정의된 스타일의 theme.ts 파일 생성
//3. 테마(또는 스타일) 주입
//4. 자식 컴포넌트(App 또는 그 이하)에서 props로 받아 사용
declare module 'styled-components' {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor?: string;
    }
}