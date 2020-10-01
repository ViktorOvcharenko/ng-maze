import { TestBed } from "@angular/core/testing";
import { MazeService } from './maze.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as fromConstants from '../constants';

describe('MazeService', () => {
  let service: MazeService;
  let backend: HttpTestingController;
  let ngZone: NgZone;
  const recordsResult = [{
    score: 0,
    username: 'test',
    date: new Date(),
    mode: 'test'
  }];

  const recordsRequestBodyResult = {
    mode: 'medium',
    records: recordsResult
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MazeService ],
    });
    service = TestBed.inject(MazeService);
    backend = TestBed.inject(HttpTestingController);
    ngZone = TestBed.inject(NgZone);
  });

  describe('generateMaze', () => {
    it('should return height and width for hard if hard mode', () => {
      expect(service.generateMaze(fromConstants.LEVELS[0].value).length).toBe(fromConstants.LEVELS[0].height + 3);
      expect(service.generateMaze(fromConstants.LEVELS[0].value)[0].length).toBe(fromConstants.LEVELS[0].width + 3);
    });

    it('should return height and width for medium if medium mode', () => {
      expect(service.generateMaze(fromConstants.LEVELS[1].value).length).toBe(fromConstants.LEVELS[1].height + 3);
      expect(service.generateMaze(fromConstants.LEVELS[1].value)[0].length).toBe(fromConstants.LEVELS[1].width + 3);
    });

    it('should return height and width for easy if easy mode', () => {
      expect(service.generateMaze(fromConstants.LEVELS[2].value).length).toBe(fromConstants.LEVELS[2].height + 2);
      expect(service.generateMaze(fromConstants.LEVELS[2].value)[0].length).toBe(fromConstants.LEVELS[2].width + 2);
    });
  });

  describe('refreshHeroLocation', () => {
    it('should refresh heroLocation', () => {
      const result = { x: 0, y: 1 };

      service.refreshHeroLocation();

      expect(service.heroLocation).toEqual(result);
    });
  });

  describe('getRecord', () => {
    it('should return records', () => {
      const mode = 'settings.medium';
      const pathMode = 'medium';

      service.getRecord(mode).subscribe(response => {
        expect(response).toEqual(recordsResult);
      });

      backend.expectOne({
        method: 'GET',
        url: `${environment.fbDBUrl}/${pathMode}.json`
      }).flush(recordsResult);
    });
  });

  describe('addRecord', () => {
    it('should add records', () => {
      service.addRecord(recordsRequestBodyResult).subscribe(response => {
        expect(response).toEqual(recordsRequestBodyResult.records);
      });

      backend.expectOne({
        method: 'PUT',
        url: `${environment.fbDBUrl}/${recordsRequestBodyResult.mode}.json`
      }).flush(recordsRequestBodyResult.records);
    });
  });
});
