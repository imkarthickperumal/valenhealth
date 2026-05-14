import React from 'react';
import './ClassSchedule.css';

const ClassSchedule: React.FC = () => {
  return (
    <section className="class-schedule reveal ep-reveal">
      <div className="schedule-container">
        <div className="schedule-header">
          <h2>WEEKLY CLASSES</h2>
        </div>
        
        <div className="schedule-table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="row-header-placeholder"></th>
                <th>MONDAY</th>
                <th>TUESDAY</th>
                <th>WEDNESDAY</th>
                <th>THURSDAY</th>
                <th>FRIDAY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-header">MORNING</td>
                <td>
                  <div className="class-time">9AM</div>
                  <div className="class-name">Fit and Fab</div>
                  <div className="class-type">(Clinical class)</div>
                </td>
                <td>
                  <div className="class-time">10AM</div>
                  <div className="class-name">Fit and Fab</div>
                  <div className="class-type">(Clinical class)</div>
                </td>
                <td>
                  <div className="class-time">9AM</div>
                  <div className="class-name">Fit and Fab</div>
                  <div className="class-type">(Clinical class)</div>
                </td>
                <td>
                  <div className="class-time">9AM</div>
                  <div className="class-name circuit">Circuit class</div>
                </td>
                <td className="empty"></td>
              </tr>
              <tr>
                <td className="row-header">AFTERNOON</td>
                <td>
                  <div className="class-time">5:30PM</div>
                  <div className="class-name circuit">Circuit Class</div>
                </td>
                <td>
                  <div className="class-time">5:30PM</div>
                  <div className="class-name">Fit and Fab</div>
                  <div className="class-type">(Clinical class)</div>
                </td>
                <td className="empty"></td>
                <td className="empty"></td>
                <td className="empty"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="schedule-footer">
          <div className="legend">
            <div className="legend-item">
              <span className="circuit-text">Circuit Classes:</span> Fun, Interactive, Fast paced
            </div>
            <div className="legend-item">
              <span className="clinical-text">Clinical Classes:</span> Structure and Routine
            </div>
          </div>
          <div className="schedule-cta">
            <span className="arrow-group">
              <span className="arrow">→</span>
              <span className="arrow">→</span>
            </span>
            <span className="cta-text">ASK STAFF TO GET BOOKED IN NOW!</span>
            <span className="arrow-group">
              <span className="arrow">←</span>
              <span className="arrow">←</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;
