import styled from 'styled-components';

export const AccountTableContent = styled.div`
    flex: 1;
    table{
        border-collapse: collapse;
        width: 100%;
        thead{
            tr{
                th:nth-child(1){
                    width: 20%;
                } 
                th:nth-child(2){
                    width: 30%;
                }
                th:nth-child(3){
                    width: 20%;
                }
                th:nth-child(4){
                    width: 30%;
                }
                th{
                    position: relative;
                    text-align: left;
                    padding: 16px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #807E89;
                    &::before{
                        content:'';
                        position: absolute;
                        top: 50%;
                        right: 0px;
                        transform: translateY(-50%);
                        width: 1px;
                        height: 4px;
                        background: #767676;
                        border-radius: 2px;
                    }
                    &:last-child{
                        &::before{
                            display: none;
                        }
                    }
                }
            }
        }
        tbody{
            tr{
                padding: 0 0 16px 0;
                width: 100%;
                height: 50px;
                border-radius: 12px;
                td{
                    color: #807E89;
                    text-align: left;
                    padding: 16px;
                    font-size: 14px;
                    font-weight: 400;
                    background: #F7F7F7;
                    position: relative;
                    z-index: 2;
                    &::before{
                        content:'';
                        position: absolute;
                        top: 50%;
                        right: 0px;
                        transform: translateY(-50%);
                        width: 1px;
                        height: 4px;
                        background: #767676;
                        border-radius: 2px;
                    }
                    &.actions{
                        display: flex;
                        gap: 8px;
                        svg{
                            width: 30px;
                            height: 30px;
                            border-radius: 4px;
                            padding: 8px;
                            cursor: pointer;
                        }
                        svg:nth-child(1), svg:nth-child(2){
                            background: #1E988F;
                            color: #fff;
                            transition: 0.4s ease;
                            &:hover{
                                background: #187771;
                            }
                        }
                        svg:nth-child(3){
                            background: #E8533D;
                            color: #fff;
                            transition: 0.4s ease;
                            &:hover{
                                background: #e4361b;
                            }
                        }
                    }
                    &:first-child{
                        // background: #fff;
                        border-radius: 12px 0 0 12px;
                    }
                    &:last-child{
                        // background: #fff;
                        border-radius: 0 12px 12px 0;
                        &::before{
                            display: none;
                        }
                    }
                    &:nth-child(3){
                        text-align: right;
                    }
                    &.loading, &.error{
                        width: 100%;
                        border-radius: 12px;
                        text-align: center;
                        font-weight: 600;
                    }
                    &.error{
                        background: #fbd0d0;
                        color: #ea2828;
                    }
                    &:nth-child(2){
                        color: #2E313A;
                        font-weight: 500;
                    }
                }
                &:nth-child(even){
                    height: 8px;
                }
                &:last-child(){
                    display: none;
                }
            }
        }
    }
`

export const AccountTableHeader = styled.div`
    display: flex;
    justify-content:  space-between;
    align-items: center;
    padding: 16px 0;
    p{
        color: #807E89;
        display: flex;
        align-items: center;
        gap: 8px;
        svg{
            width: 14px;
            height: 14px;
        }
        font-size: 14px; 
        span{
            font-weight: 800;
        }
    }
`

export const Pagination = styled.div`
    text-align: right; 
    color: #767676;
`