import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./HistoryItem.module.css";
import host_config from "../../config/serverHost";
import MemoContents from "./MemoContents";
import SummaryContents from "./SummaryContents";

const HistoryItem = (props) => {
  const { subMeetingId, date, topic, participants, keywords, config } = props;
  const [memoContent, setMemoContent] = useState(null);
  const [summaryContent, setSummaryContent] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://${host_config.current_host}:${host_config.current_port}/memos/memo/${subMeetingId}`,
        config
      )
      .then((res) => {
        if (res.data.result?.length !== 0) setMemoContent(res.data.result[0]);
      });

    axios
      .get(
        `http://${host_config.current_host}:${host_config.current_port}/summaries/summary/${subMeetingId}`,
        config
      )
      .then((res) => {
        setSummaryContent(res.data.result);
      });
  }, []);

  const clickMemoHandler = () => {
    setIsMemoOpen((prev) => !prev);
  };

  const clickSummaryHandler = () => {
    setIsSummaryOpen((prev) => !prev);
  };

  const openDetailsHandler = () => {
    if (isDetailsOpen === true) {
      setIsMemoOpen(false);
      setIsSummaryOpen(false);
    }
    setIsDetailsOpen((prev) => !prev);
  };

  const memoContents = memoContent ? (
    <MemoContents item={memoContent} />
  ) : (
    <div>작성한 노트가 없어요 😢</div>
  );

  const summaryContents =
    summaryContent?.length !== 0 ? (
      <SummaryContents items={summaryContent} />
    ) : (
      <div>요약본이 기록되지 않았어요 😢</div>
    );

  return (
    <li className={`${styles.historyItem} ${isDetailsOpen && styles.clicked}`}>
      <div
        className={`${styles.historyInfo} ${isDetailsOpen && styles.clicked}`}
        onClick={openDetailsHandler}
      >
        <div className={styles.date}>{date}</div>
        <div className={styles.topic}>{topic}</div>
        <div className={styles.keywords}>
          {keywords.map((keyword) => {
            return <span className={styles.keyword}>{keyword}</span>;
          })}
        </div>
      </div>
      {isDetailsOpen && (
        <div className={styles.historyDetails}>
          <div className={styles.participants}>참가자 | {participants}</div>
          <div className={styles.toggle} onClick={clickMemoHandler}>
            ✍🏻 NOTE
          </div>
          {isMemoOpen && <>{memoContents}</>}
          <div className={styles.toggle} onClick={clickSummaryHandler}>
            🗒 회의 요약본
          </div>
          {isSummaryOpen && <>{summaryContents}</>}
        </div>
      )}
    </li>
  );
};

export default HistoryItem;